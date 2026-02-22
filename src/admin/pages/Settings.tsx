

export default function Settings() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Settings</h2>
            <div className="max-w-2xl bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                        <input type="text" className="w-full p-2 border rounded" defaultValue="Fresqo" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                        <input type="email" className="w-full p-2 border rounded" defaultValue="fresqo.in@gmail.com" />
                    </div>
                    <button className="bg-fresqo-dark text-white px-4 py-2 rounded">Save Changes</button>
                </div>
            </div>
        </div>
    );
}
