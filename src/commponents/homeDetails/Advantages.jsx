export default function Advantages({ advantages }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow mt-4">
            <h3 className="text-lg font-bold mb-3">Հյուրատան առավելությունները</h3>
            <ul className="list-disc ml-5 space-y-1">
                {advantages.map((a, i) => (
                    <li key={i}>{a}</li>
                ))}
            </ul>
        </div>
    );
}
