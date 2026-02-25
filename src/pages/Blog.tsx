import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogs } from '@/data/blogs';

export default function Blog() {
    const navigate = useNavigate();
    return (
        <div className="pt-[100px] min-h-screen bg-fresqo-cream flex flex-col">
            <section id="blog-page" className="flex-1 pb-16 pt-4 relative overflow-hidden h-full flex flex-col">
                <div className="container-custom flex-1 h-full flex flex-col">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-oswald text-4xl md:text-5xl font-bold text-fresqo-dark mb-6"
                        >
                            The <span className="gradient-text">Fresqo</span> Journal
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-fresqo-gray"
                        >
                            Explore our latest tips, recipes, and inspiration to elevate every gathering you host.
                        </motion.p>
                    </div>

                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {blogs.map((post, index) => (
                                <motion.article
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    key={post.id}
                                    onClick={() => navigate(`/blog/${post.id}`)}
                                    className="bg-white rounded-3xl overflow-hidden shadow-soft card-lift flex flex-col group cursor-pointer border border-fresqo-border"
                                >
                                    <div className="aspect-[4/3] relative overflow-hidden bg-fresqo-cream">
                                        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-fresqo-dark uppercase tracking-wider">
                                            {post.category}
                                        </div>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 text-xs font-medium text-fresqo-gray mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <h3 className="font-oswald text-xl font-bold text-fresqo-dark mb-3 leading-tight group-hover:text-fresqo-aqua transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-fresqo-gray text-sm line-clamp-3 mb-6 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-auto">
                                            <span className="inline-flex items-center gap-2 text-sm font-bold text-fresqo-dark group-hover:text-fresqo-lime transition-colors">
                                                Read Article <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
