const FAQHelpCenter = () => {
    return (
        <div className="container mx-auto p-6 space-y-2 py-20">
            <h1 className="flex justify-center text-4xl mb-4 font-semibold">FAQ Center</h1>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium">What is Parcel Management?</div>
                <div className="collapse-content">
                    <p>Parcel Management refers to the process of organizing, tracking, and managing parcels and deliveries within a system.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">How do I track my parcel?</div>
                <div className="collapse-content">
                    <p>You can track your parcel by entering the tracking number provided to you during the delivery process.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">What should I do if my parcel is delayed?</div>
                <div className="collapse-content">
                    <p>If your parcel is delayed, you should contact customer support with your tracking number to inquire about the status.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">How can I change the delivery address?</div>
                <div className="collapse-content">
                    <p>To change the delivery address, please contact customer support as soon as possible with your order details.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">Can I cancel my parcel delivery?</div>
                <div className="collapse-content">
                    <p>Parcel cancellations depend on the status of your order. If it hasn't been dispatched, you may be able to cancel it by contacting customer support.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">What happens if I’m not at home when my parcel arrives?</div>
                <div className="collapse-content">
                    <p>If you're not at home, the delivery service will typically leave a delivery notice and attempt redelivery at a later time.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">How do I return a parcel?</div>
                <div className="collapse-content">
                    <p>To return a parcel, follow the return instructions provided with your order or contact customer support for assistance.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">Are there any additional charges for parcel redelivery?</div>
                <div className="collapse-content">
                    <p>Additional charges may apply for redelivery depending on the delivery service's policies. Please check with customer support for specific details.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQHelpCenter;
