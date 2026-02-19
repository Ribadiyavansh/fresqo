export default function Contact() {
    return (
        <div className="pt-32 px-6 min-h-screen bg-fresqo-offwhite">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-soft">
                <h1 className="text-4xl font-bold font-oswald text-fresqo-dark mb-6">Contact Us</h1>
                <p className="text-gray-600 mb-8">Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fresqo-lime focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fresqo-lime focus:outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fresqo-lime focus:outline-none"></textarea>
                    </div>
                    <button type="submit" className="bg-fresqo-dark text-white px-8 py-3 rounded-full hover:bg-black transition-colors">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
