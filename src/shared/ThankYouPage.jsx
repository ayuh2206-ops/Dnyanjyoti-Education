import React from 'react';
import { CheckCircle, MessageCircle, Send, Instagram, Facebook } from 'lucide-react';

export default function ThankYouPage({ content, settings }) {
    const { thankYou } = content;
    
    return (
        <div className="min-h-screen py-12 px-6 flex flex-col items-center justify-center bg-primary text-white relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]"></div>
            <div className="max-w-4xl w-full bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden relative z-10">
                <div className="bg-primary p-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl ring-4 ring-green-400/30 animate-bounce">
                        <CheckCircle className="text-white" size={48} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{thankYou.title}</h1>
                    <p className="text-blue-100 text-lg">{thankYou.subtitle}</p>
                </div>
                <div className="p-8 md:p-12">
                    <h3 className="font-bold text-xl text-primary mb-6">{thankYou.nextSteps}</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">1</div>
                            <div>
                                <p className="font-medium text-slate-800">{thankYou.steps[0].title}</p>
                                <a href={settings.socialLinks.whatsapp} target="_blank" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg font-bold hover:brightness-110 shadow-md mt-2">
                                    <MessageCircle size={18} /> {thankYou.steps[0].action}
                                </a>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">2</div>
                            <div>
                                <p className="font-medium text-slate-800">{thankYou.steps[1].title}</p>
                                <div className="flex gap-2 mt-2">
                                    <a href={settings.socialLinks.instagram} target="_blank" className="p-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-lg hover:opacity-90 shadow-sm">
                                        <Instagram size={20} />
                                    </a>
                                    <a href={settings.socialLinks.facebook} target="_blank" className="p-2 bg-[#1877F2] text-white rounded-lg hover:brightness-110 shadow-sm">
                                        <Facebook size={20} />
                                    </a>
                                    <a href={settings.socialLinks.telegram} target="_blank" className="p-2 bg-[#0088cc] text-white rounded-lg hover:brightness-110 shadow-sm">
                                        <Send size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
