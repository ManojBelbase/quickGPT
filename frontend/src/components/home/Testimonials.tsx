import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { testimonialsData } from '../../const/testimonialsData';

const StarRating = ({ count }: any) => {
    return (
        <div className="flex space-x-1 mb-5">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    size={16}
                    className={`${index < count
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200"
                        } drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]`}
                />
            ))}
        </div>
    );
};

export const Testimonials = () => {
    return (
        <section className="relative py-32 bg-white overflow-hidden">
            {/* 1. Artistic Background Blobs */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-purple-50 rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] opacity-60" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* 2. Header with Social Proof Badge */}
                <div className="flex flex-col items-center text-center mb-20">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <CheckCircle2 size={14} />
                        Trusted by 12k+ Innovators
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
                        What real <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">creators</span> say.
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
                        Our AI tools are helping thousands of designers, writers, and
                        engineers reclaim their time. Here is the proof.
                    </p>
                </div>

                {/* 3. Masonry-style Responsive Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {testimonialsData.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="break-inside-avoid relative group"
                        >
                            {/* Card Glow Effect on Hover */}
                            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-500 rounded-4xl opacity-0 group-hover:opacity-10 transition duration-500 blur-lg" />

                            <div className="relative bg-white p-8 rounded-4xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500">

                                {/* Floating Quote Icon */}
                                <div className="absolute top-6 right-8 text-slate-100 group-hover:text-indigo-50 transition-colors">
                                    <Quote size={40} fill="currentColor" />
                                </div>

                                <StarRating count={testimonial.rating} />

                                <p className="relative z-10 text-slate-700 text-lg leading-relaxed mb-8 font-medium">
                                    "{testimonial.review}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                                    <div className="relative">
                                        <img
                                            src={testimonial.avatarUrl}
                                            alt={testimonial.name}
                                            className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50 group-hover:ring-indigo-50 transition-all shadow-md"
                                        />
                                        {/* Verified Badge */}
                                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-0.5 border-2 border-white">
                                            <CheckCircle2 size={10} fill="currentColor" />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-slate-900 leading-tight">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-indigo-500 font-semibold uppercase tracking-tighter">
                                            {testimonial.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};