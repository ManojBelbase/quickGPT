import { PricingTable } from "@clerk/clerk-react"
const Plans = () => {
    return (
        <div className="max-w-2xl mx-auto z-20 my-30">
            <div className="text-center">
                <h2 className="text-slate-700 text-[42px] font-semibold">Choose your plan</h2>
                <p>Start for free and scale up as you grow. find the perfect plan for your content creation needs.</p>

            </div>
            <div className="mt-10">
                <PricingTable />
            </div>
        </div>
    )
}

export default Plans