import React from 'react';
import { CheckCircle, ChevronRight, BookOpen, Clock, Award, Download, Star, Zap, Target, Brain, Scale, FileText } from 'lucide-react';

export default function LandingPage({ content, handleRegister, isSubmitting }) {
    const { hero, whyJoin, agenda, secrets, mentor, benefits, form } = content;
    
    return (
        <div>
            {/* Hero */}
            <section className="relative pt-24 pb-32 px-6 md:px-12 bg-primary text-white overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900/50 border border-accent/30 shadow-lg backdrop-blur-sm">
                            <span className="text-accent font-extrabold uppercase tracking-widest text-xs sm:text-sm animate-pulse">{hero.badge}</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                        {hero.title.split(hero.titleHighlight)[0]}
                        <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">{hero.titleHighlight}</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">{hero.subtitle}</p>
                    <button onClick={() => document.getElementById('reg-form')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-accent hover:brightness-110 text-white font-bold rounded-xl text-lg shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto">
                        {hero.cta} <ChevronRight size={20} />
                    </button>
                </div>
            </section>

            {/* Why Join */}
            <section className="py-24 px-6 bg-white relative z-20 -mt-10 rounded-t-[40px]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{whyJoin.title}</h2>
                        <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {whyJoin.points.map((item, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-slate-50 hover:shadow-xl transition-all border hover:border-accent">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                    {i === 0 ? <BookOpen className="text-accent" size={32} /> : i === 1 ? <Clock className="text-accent" size={32} /> : <Target className="text-accent" size={32} />}
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Agenda */}
            <section className="py-24 px-6 bg-primary text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{agenda.title}</h2>
                        <p className="text-slate-300 text-lg">{agenda.subtitle}</p>
                        <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mt-4"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {agenda.items.map((item, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-accent text-primary font-bold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">{i + 1}</div>
                                <p className="font-medium text-slate-100 leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Secrets */}
            <section className="py-24 px-6 bg-slate-900 text-white border-t border-slate-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{secrets.title}</h2>
                        <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {secrets.items.map((secret, i) => (
                            <div key={i} className="bg-slate-800 p-8 rounded-2xl border-l-4 border-accent hover:translate-y-[-5px] transition-transform">
                                <div className="mb-4 text-accent">
                                    {i === 0 ? <Zap size={32} /> : i === 1 ? <Scale size={32} /> : i === 2 ? <FileText size={32} /> : <Target size={32} />}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{secret.title}</h3>
                                <p className="text-slate-300">{secret.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dr. Vishal */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-primary rounded-[2.5rem] overflow-hidden shadow-2xl text-white border border-slate-800">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-5/12 bg-slate-900 relative min-h-[450px] overflow-hidden">
                                <img src="https://res.cloudinary.com/dkkkjtoa9/image/upload/v1765787346/image6555_mh6v2z.png" alt={mentor.name} className="absolute inset-0 w-full h-full object-cover object-top opacity-90" width="500" height="600" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                                        <p className="font-serif italic text-blue-100 text-sm">"{mentor.quote}"</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-7/12 p-8 md:p-14 flex flex-col justify-center">
                                <h3 className="text-accent font-bold tracking-widest uppercase text-xs mb-3">{mentor.badge}</h3>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">{mentor.name}</h2>
                                <p className="text-slate-400 mb-10 leading-relaxed text-lg">{mentor.description}</p>
                                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                                    {mentor.stats.slice(0, 4).map((stat, i) => (
                                        <div key={i}>
                                            <h4 className="text-4xl font-extrabold text-white">{stat.value}</h4>
                                            <p className="text-sm text-slate-500 uppercase tracking-wide mt-1">{stat.label}</p>
                                        </div>
                                    ))}
                                    <div className="col-span-2">
                                        <h4 className="text-4xl font-extrabold text-white">{mentor.stats[4].value}</h4>
                                        <p className="text-sm text-slate-500 uppercase tracking-wide mt-1">{mentor.stats[4].label}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-primary flex items-center justify-center">
                                <Star size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">{benefits.whyRegister.title}</h3>
                        </div>
                        <ul className="space-y-4">
                            {benefits.whyRegister.items.map((item, i) => (
                                <li key={i} className="flex gap-3 text-slate-700">
                                    <CheckCircle size={20} className="text-accent shrink-0 mt-1" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-xl border">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                                <Download size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">{benefits.whatYouGet.title}</h3>
                        </div>
                        <ul className="space-y-4">
                            {benefits.whatYouGet.items.map((item, i) => (
                                <li key={i} className="flex gap-3 text-slate-700">
                                    <CheckCircle size={20} className="text-green-600 shrink-0 mt-1" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section id="reg-form" className="py-24 px-6 bg-bgBody">
                <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border">
                    <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-primary">{form.title}</h2>
                        <p className="text-slate-500 mt-2">{form.subtitle}</p>
                    </div>
                    <form onSubmit={handleRegister} className="space-y-5">
                        <input required name="fullName" placeholder={form.fields.name} className="w-full px-4 py-4 rounded-xl bg-slate-50 border focus:border-accent outline-none" />
                        <input required name="email" type="email" placeholder={form.fields.email} className="w-full px-4 py-4 rounded-xl bg-slate-50 border focus:border-accent outline-none" />
                        <input required name="phone" type="tel" placeholder={form.fields.phone} className="w-full px-4 py-4 rounded-xl bg-slate-50 border focus:border-accent outline-none" />
                        <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-primary text-white font-bold rounded-xl text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                            {isSubmitting ? form.submitting : <span>{form.submit} <ChevronRight size={20} className="inline"/></span>}
                        </button>
                        <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl text-center">
                            <p className="text-sm font-bold text-slate-800">{form.note}</p>
                        </div>
                        <p className="text-center text-xs text-slate-400 mt-2">{form.disclaimer}</p>
                    </form>
                </div>
            </section>
        </div>
    );
}
