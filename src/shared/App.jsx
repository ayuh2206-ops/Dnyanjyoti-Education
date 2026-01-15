import React, { useState, useEffect } from 'react';
import { Settings, Lock, Unlock, X, Eye, ShieldCheck, CheckCircle, Home, RotateCcw, Users } from 'lucide-react';
import { db } from '../firebase-config';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, query, orderBy, setDoc, onSnapshot } from 'firebase/firestore';
import AdminPanel from './AdminPanel';
import LandingPage from './LandingPage';
import ThankYouPage from './ThankYouPage';

const DEFAULT_SETTINGS = {
    theme: { primary: '#002244', accent: '#EA580C', background: '#F8FAFC' },
    socialLinks: { whatsapp: 'https://chat.whatsapp.com/IiVEYeZjLbE4QKhmMasAmV', telegram: '#', instagram: '#', facebook: '#' },
    adminPasskey: 'admin123'
};

export default function App({ content, COLLECTION, SETTINGS, LANGUAGE }) {
    const [currentPage, setCurrentPage] = useState('landing');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginPasskey, setLoginPasskey] = useState('');
    const [isSettingNewPasskey, setIsSettingNewPasskey] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [adminPanelOpen, setAdminPanelOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [dbPasskey, setDbPasskey] = useState(null);
    const [leads, setLeads] = useState([]);
    const [isLoadingLeads, setIsLoadingLeads] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!db) return;
        try {
            const unsubscribe = onSnapshot(doc(db, "settings", SETTINGS), (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setDbPasskey(data.adminPasskey || null);
                    setSettings(prev => ({ ...prev, ...data, socialLinks: { ...prev.socialLinks, ...data.socialLinks } }));
                } else { setDbPasskey(null); }
            });
            return () => unsubscribe();
        } catch (e) { console.warn("Sync failed", e); }
    }, [SETTINGS]);

    const fetchLeads = async () => {
        setIsLoadingLeads(true);
        try {
            const q = query(collection(db, COLLECTION), orderBy("registeredAt", "desc"));
            const querySnapshot = await getDocs(q);
            setLeads(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (e) {
            try {
                const q = collection(db, COLLECTION);
                const querySnapshot = await getDocs(q);
                setLeads(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch(err) { console.error(err); }
        } finally { setIsLoadingLeads(false); }
    };

    const handleDeleteLead = async (id) => {
        if (!confirm(content.admin.messages.deleteConfirm)) return;
        try { 
            await deleteDoc(doc(db, COLLECTION, id)); 
            setLeads(leads.filter(l => l.id !== id)); 
        } catch(e) { alert(e.message); }
    };

    const handleEditLead = async (lead) => {
        const newName = prompt(content.admin.messages.editName, lead.name); if(newName===null) return;
        const newEmail = prompt(content.admin.messages.editEmail, lead.email); if(newEmail===null) return;
        const newPhone = prompt(content.admin.messages.editPhone, lead.phone); if(newPhone===null) return;
        try {
            await updateDoc(doc(db, COLLECTION, lead.id), { name: newName, email: newEmail, phone: newPhone });
            setLeads(leads.map(l => l.id === lead.id ? {...l, name: newName, email: newEmail, phone: newPhone} : l));
        } catch(e) { alert(e.message); }
    };

    const exportToCSV = () => {
        if (leads.length === 0) {
            alert(content.admin.messages.noExport);
            return;
        }
        const headers = content.admin.tableHeaders.slice(1, -1);
        const csvContent = [
            headers.join(','),
            ...leads.map(lead => [
                `"${lead.name || ''}"`,
                `"${lead.email || ''}"`,
                `"${lead.phone || ''}"`,
                `"${new Date(lead.registeredAt).toLocaleString(LANGUAGE === 'mr' ? 'mr-IN' : 'en-US')}"`,
                `"${lead.source || 'web'}"`
            ].join(','))
        ].join('\n');
        const BOM = LANGUAGE === 'mr' ? '\uFEFF' : '';
        const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `leads_${LANGUAGE}_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const filteredLeads = leads.filter(lead => 
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm)
    );

    const submitLogin = async () => {
        if (!loginPasskey.trim()) return alert(content.admin.messages.enterPasskey);
        if (isSettingNewPasskey) {
            try {
                await setDoc(doc(db, "settings", SETTINGS), { adminPasskey: loginPasskey.trim() }, { merge: true });
                setIsAdmin(true); setAdminPanelOpen(true); setShowLoginModal(false);
            } catch (e) { alert(e.message); }
        } else {
            if (loginPasskey === dbPasskey) { 
                setIsAdmin(true); setAdminPanelOpen(true); setShowLoginModal(false); 
            } else { alert(content.admin.messages.incorrectPasskey); }
        }
    };

    const saveSettings = async (newSettings) => {
        try {
            setSettings(newSettings);
            await setDoc(doc(db, "settings", SETTINGS), newSettings, { merge: true });
        } catch (err) { alert(err.message); }
    };

    const resetSettings = async () => {
        if(!confirm(content.admin.messages.resetConfirm)) return;
        try {
            const resetData = { ...DEFAULT_SETTINGS, adminPasskey: dbPasskey };
            setSettings(DEFAULT_SETTINGS);
            await setDoc(doc(db, "settings", SETTINGS), resetData, { merge: true });
        } catch (err) { alert(err.message); }
    }

    const handleRegister = async (e) => {
        e.preventDefault(); setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const leadData = { 
            name: formData.get('fullName'), 
            email: formData.get('email'), 
            phone: formData.get('phone'), 
            registeredAt: new Date().toISOString(), 
            source: `web_${LANGUAGE}` 
        };
        try {
            await addDoc(collection(db, COLLECTION), leadData);
            setTimeout(() => { 
                setCurrentPage('thankyou'); 
                window.scrollTo(0,0); 
                setIsSubmitting(false); 
            }, 500);
        } catch (error) { 
            alert("Failed. Check console."); 
            setIsSubmitting(false); 
        }
    };

    return (
        <div style={{ '--primary': settings.theme.primary, '--accent': settings.theme.accent }} className="animate-fade-in font-sans">
            {/* Admin Controls */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
                <button 
                    onClick={() => { 
                        if(isAdmin) setAdminPanelOpen(!adminPanelOpen); 
                        else { setShowLoginModal(true); setLoginPasskey(''); setIsSettingNewPasskey(!dbPasskey); } 
                    }} 
                    className={`p-3 rounded-full shadow-xl border transition-all ${isAdmin ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 hover:text-[var(--accent)]'}`}
                >
                    {isAdmin ? <Settings size={24} /> : <Lock size={20} />}
                </button>

                {showLoginModal && (
                    <div className="absolute bottom-16 right-0 bg-white p-4 rounded-2xl shadow-2xl border w-72 mb-2">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-sm">{isSettingNewPasskey ? content.admin.login.setPasskey : content.admin.login.title}</h3>
                            <button onClick={() => setShowLoginModal(false)}><X size={16}/></button>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">{isSettingNewPasskey ? content.admin.login.createPasskey : content.admin.login.enterPasskey}</p>
                        <div className="relative mb-3">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={loginPasskey} 
                                onChange={(e) => setLoginPasskey(e.target.value)} 
                                className="w-full text-sm p-2 border rounded outline-none pr-8" 
                                placeholder={content.admin.login.placeholder}
                            />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2.5">
                                <Eye size={14}/>
                            </button>
                        </div>
                        <button onClick={submitLogin} className="w-full bg-[var(--primary)] text-white py-2 rounded text-sm font-bold">
                            {isSettingNewPasskey ? content.admin.login.save : content.admin.login.unlock}
                        </button>
                    </div>
                )}

                {isAdmin && adminPanelOpen && (
                    <div className="absolute bottom-16 right-0 bg-white p-0 rounded-2xl shadow-2xl border w-80 overflow-hidden mb-2">
                        <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
                            <h3 className="font-bold flex items-center gap-2 text-sm"><ShieldCheck size={16} /> {content.admin.title}</h3>
                            <button onClick={() => { setIsAdmin(false); setAdminPanelOpen(false); }} className="text-xs hover:text-white flex items-center gap-1">
                                <Unlock size={12} /> {content.admin.logout}
                            </button>
                        </div>
                        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                            <div className="flex justify-between items-center pb-2 border-b">
                                <span className="text-xs font-bold text-slate-400 uppercase">{content.admin.siteSettings}</span>
                                <button onClick={resetSettings} className="flex items-center gap-1 text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded">
                                    <RotateCcw size={10} /> {content.admin.reset}
                                </button>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-lg mb-4 flex gap-2">
                                <button 
                                    onClick={() => { setCurrentPage('landing'); setAdminPanelOpen(false); }} 
                                    className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1 ${currentPage === 'landing' ? 'bg-white shadow text-[var(--primary)]' : 'text-slate-500'}`}
                                >
                                    <Home size={14} /> {content.admin.home}
                                </button>
                                <button 
                                    onClick={() => { setCurrentPage('thankyou'); setAdminPanelOpen(false); }} 
                                    className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1 ${currentPage === 'thankyou' ? 'bg-white shadow text-[var(--primary)]' : 'text-slate-500'}`}
                                >
                                    <CheckCircle size={14} /> {content.admin.thankYouPage}
                                </button>
                            </div>
                            <button 
                                onClick={() => { setCurrentPage('admin-dashboard'); fetchLeads(); setAdminPanelOpen(false); }} 
                                className="w-full bg-[var(--primary)] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-md mb-4"
                            >
                                <Users size={16} /> {content.admin.manageLeads}
                            </button>
                            
                            <div>
                                <label className="text-xs font-bold text-slate-400">{content.admin.colors.primary}</label>
                                <input 
                                    type="color" 
                                    value={settings.theme.primary} 
                                    onChange={(e) => saveSettings({ ...settings, theme: { ...settings.theme, primary: e.target.value } })} 
                                    className="w-full h-8 rounded cursor-pointer mt-1" 
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400">{content.admin.colors.accent}</label>
                                <input 
                                    type="color" 
                                    value={settings.theme.accent} 
                                    onChange={(e) => saveSettings({ ...settings, theme: { ...settings.theme, accent: e.target.value } })} 
                                    className="w-full h-8 rounded cursor-pointer mt-1" 
                                />
                            </div>
                            {['whatsapp', 'telegram', 'instagram', 'facebook'].map(platform => (
                                <div key={platform}>
                                    <label className="text-xs font-bold text-slate-400">{content.admin.links[platform]}</label>
                                    <input 
                                        type="text" 
                                        value={settings.socialLinks[platform]} 
                                        onChange={(e) => saveSettings({ ...settings, socialLinks: { ...settings.socialLinks, [platform]: e.target.value } })} 
                                        className="w-full text-xs p-2 border rounded mt-1" 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {currentPage === 'admin-dashboard' ? (
                <AdminPanel 
                    content={content}
                    LANGUAGE={LANGUAGE}
                    leads={leads}
                    filteredLeads={filteredLeads}
                    isLoadingLeads={isLoadingLeads}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setCurrentPage={setCurrentPage}
                    handleEditLead={handleEditLead}
                    handleDeleteLead={handleDeleteLead}
                    exportToCSV={exportToCSV}
                    fetchLeads={fetchLeads}
                />
            ) : currentPage === 'thankyou' ? (
                <ThankYouPage content={content} settings={settings} />
            ) : (
                <LandingPage content={content} handleRegister={handleRegister} isSubmitting={isSubmitting} />
            )}
        </div>
    );
}
