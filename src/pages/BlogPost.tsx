import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { blogs } from '@/data/blogs';

export default function BlogPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const post = blogs.find(b => b.id === id || b.id === Number(id).toString());

    if (!post) {
        return (
            <div className="pt-24 min-h-screen bg-fresqo-cream flex flex-col justify-center items-center">
                <h2 className="text-2xl font-oswald text-fresqo-dark mb-4">Article Not Found</h2>
                <button onClick={() => navigate('/blog')} className="btn-primary">
                    Back to Blog
                </button>
            </div>
        );
    }

    return (
        <div className="pt-[100px] min-h-screen bg-fresqo-cream flex flex-col">
            <article className="flex-1 pt-4 pb-16 relative overflow-hidden h-full flex flex-col">
                <div className="container-custom max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate('/blog')}
                        className="flex items-center gap-2 text-fresqo-gray hover:text-fresqo-lime mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>

                    <div className="bg-white rounded-3xl overflow-hidden shadow-soft card-lift border border-fresqo-border p-6 md:p-12">
                        <div className="mb-8">
                            <div className="inline-block bg-fresqo-cream text-fresqo-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                {post.category}
                            </div>
                            <h1 className="font-oswald text-4xl md:text-5xl font-bold text-fresqo-dark mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-6 text-sm font-medium text-fresqo-gray">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {post.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                            </div>
                        </div>

                        <div className="aspect-[21/9] relative overflow-hidden bg-fresqo-cream rounded-2xl mb-12">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="prose prose-lg max-w-none text-fresqo-gray">
                            <p className="lead text-xl font-medium text-fresqo-dark mb-8">
                                {post.excerpt}
                            </p>

                            {/* Simple line break parsing for content */}
                            {post.content.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-6 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
