import React from 'react';
import { Users, CheckCircle, Clock, FileDown, Search, ArrowLeft, Edit2, Trash2, RotateCcw } from 'lucide-react';

export default function AdminPanel({ content, LANGUAGE, leads, filteredLeads, isLoadingLeads, searchTerm, setSearchTerm, setCurrentPage, handleEditLead, handleDeleteLead, exportToCSV, fetchLeads }) {
    const { admin } = content;
    
    return (
        <div className="min-h-screen bg-slate-100">
            <div className="bg-white border-b sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                <Users className="text-white" size={20} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">{admin.dashboard}</h1>
                                <p className="text-xs text-slate-500">{admin.subtitle}</p>
                            </div>
                        </div>
                        <button onClick={() => setCurrentPage('landing')} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium flex items-center gap-2 text-sm">
                            <ArrowLeft size={16} /> {admin.backToSite}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{admin.stats.total}</p>
                                <p className="text-3xl font-bold text-primary mt-1">{leads.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                <Users className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{admin.stats.today}</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">
                                    {leads.filter(l => new Date(l.registeredAt).toDateString() === new Date().toDateString()).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{admin.stats.week}</p>
                                <p className="text-3xl font-bold text-orange-600 mt-1">
                                    {leads.filter(l => {
                                        const d = new Date(l.registeredAt);
                                        const now = new Date();
                                        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                                        return d >= weekAgo;
                                    }).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                                <Clock className="text-orange-600" size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-primary to-slate-800 rounded-2xl p-5 shadow-sm">
                        <button onClick={exportToCSV} className="w-full h-full flex flex-col items-center justify-center text-white hover:scale-105 transition-transform">
                            <FileDown size={28} className="mb-2" />
                            <span className="font-bold text-sm">{admin.stats.export}</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border mb-6">
                    <div className="p-4 border-b">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder={admin.search} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                    </div>

                    {isLoadingLeads ? (
                        <div className="p-12 text-center">
                            <div className="spinner mx-auto mb-4"></div>
                            <p className="text-slate-500">{admin.loading}</p>
                        </div>
                    ) : filteredLeads.length === 0 ? (
                        <div className="p-12 text-center">
                            <Users className="mx-auto mb-4 text-slate-300" size={48} />
                            <p className="text-slate-500 font-medium">{admin.noLeads}</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50 border-b">
                                        {admin.tableHeaders.map((h, i) => (
                                            <th key={i} className={`text-${i === admin.tableHeaders.length - 1 ? 'right' : 'left'} px-6 py-4 text-xs font-semibold text-slate-500 uppercase`}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredLeads.map((lead, index) => (
                                        <tr key={lead.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4"><span className="text-xs font-medium text-slate-400">{index + 1}</span></td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                                                        {lead.name?.charAt(0)?.toUpperCase() || '?'}
                                                    </div>
                                                    <span className="font-medium">{lead.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4"><span className="text-slate-600">{lead.email}</span></td>
                                            <td className="px-6 py-4"><span className="text-slate-600 font-mono text-sm">{lead.phone}</span></td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm">{new Date(lead.registeredAt).toLocaleDateString(LANGUAGE === 'mr' ? 'mr-IN' : 'en-US')}</p>
                                                    <p className="text-xs text-slate-400">{new Date(lead.registeredAt).toLocaleTimeString(LANGUAGE === 'mr' ? 'mr-IN' : 'en-US')}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEditLead(lead)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title={admin.edit}>
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button onClick={() => handleDeleteLead(lead.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title={admin.delete}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filteredLeads.length > 0 && (
                        <div className="px-6 py-4 bg-slate-50 border-t flex justify-between items-center">
                            <p className="text-sm text-slate-500">
                                {admin.showing} <span className="font-medium text-slate-900">{filteredLeads.length}</span> {admin.of} <span className="font-medium text-slate-900">{leads.length}</span> {admin.leads}
                            </p>
                            <button onClick={fetchLeads} className="text-sm text-accent hover:underline font-medium flex items-center gap-1">
                                <RotateCcw size={14} /> {admin.refresh}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
