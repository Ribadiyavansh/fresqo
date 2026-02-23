import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const blogs = [
    {
        id: 1,
        title: "10 Creative Ways to Use Fresqo Cocktail Balls at Your Next Party",
        excerpt: "Discover unique serving ideas and creative combinations to elevate your hosting game with our premium cocktail balls.",
        date: "Oct 15, 2023",
        readTime: "5 min read",
        image: "/images/hero-bomb.jpg",
        category: "Entertaining",
    },
    {
        id: 2,
        title: "The Science Behind the Perfect Fizz",
        excerpt: "Ever wondered what makes our cocktail balls fizz so perfectly? Dive into the science of carbonation and flavor release.",
        date: "Oct 28, 2023",
        readTime: "4 min read",
        image: "/images/product-cola.jpg",
        category: "Behind the Scenes",
    },
    {
        id: 3,
        title: "Mocktail Magic: Crafting Alcohol-Free Masterpieces",
        excerpt: "Who says you need alcohol to have fun? Learn how to mix incredible mocktails using Fresqo for the whole family.",
        date: "Nov 05, 2023",
        readTime: "6 min read",
        image: "/images/product-mojito.jpg",
        category: "Recipes",
    },
    {
        id: 4,
        title: "Pairing Fresqo Flavors with Gourmet Appetizers",
        excerpt: "A comprehensive guide to matching our delicious cocktail and mocktail flavors with the perfect bite-sized party foods.",
        date: "Nov 12, 2023",
        readTime: "7 min read",
        image: "/images/product-watermelon.jpg",
        category: "Pairings",
    },
    {
        id: 5,
        title: "From Setup to Cleanup: The Ultimate Host's Guide",
        excerpt: "Streamline your party planning with our foolproof guide to hosting an unforgettable event with minimal stress.",
        date: "Nov 20, 2023",
        readTime: "5 min read",
        image: "/images/product-pinacolada.jpg",
        category: "Entertaining",
    }
];

export default function BlogSection() {
    const [showAll, setShowAll] = useState(false);

    const displayedBlogs = showAll ? blogs : blogs.slice(0, 3);

    return (
        <section id="blog" className="py-24 bg-fresqo-cream relative overflow-hidden">
            <div className="container-custom">
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
                        Tips, recipes, and inspiration for making every celebration unforgettable.
                    </motion.p>
                </div>

                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {displayedBlogs.map((post, index) => (
                            <motion.article
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                key={post.id}
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

                {blogs.length > 3 && (
                    <motion.div
                        layout
                        className="mt-16 flex justify-center"
                    >
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="btn-primary"
                        >
                            {showAll ? 'Show Less' : 'Read More Articles'}
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
