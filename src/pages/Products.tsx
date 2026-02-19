export default function Products() {
    return (
        <div className="pt-32 px-6 min-h-screen bg-fresqo-offwhite">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold font-oswald text-fresqo-dark mb-8">All Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Placeholder for products */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                        <h3 className="text-xl font-bold">Coming Soon</h3>
                        <p className="text-gray-600">Our full collection is launching shortly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
