import { Star } from 'lucide-react';
import { testimonialsData } from '../../const/testimonialsData';


// Helper component to render stars
const StarRating = ({ count }: any) => {
    return (
        <div className="flex space-x-0.5 mb-4">
            {Array.from({ length: count }).map((_, index) => (
                // Used fill and text colors to match the star style in the image
                <Star key={index} className="w-5 h-5 fill-purple-600 text-purple-600" />
            ))}
        </div>
    );
};


export const Testimonials = () => {
    return (
        <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Loved by Creators
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Don't just take our word for it. Here's what our users are saying.
                    </p>
                </div>

                {/* Testimonials Grid (Fully Responsive) */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {testimonialsData.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            // MINIMAL STYLING: Clean white card, rounded corners, subtle border
                            className="bg-white p-8 rounded-2xl border border-gray-200"
                        >
                            {/* Star Rating */}
                            <StarRating count={testimonial.rating} />

                            {/* Review Text */}
                            <p className="text-gray-700 italic leading-relaxed mb-6">
                                "{testimonial.review}"
                            </p>

                            {/* Divider */}
                            <hr className="border-gray-100 mb-6" />

                            {/* User Info (Avatar and Details) */}
                            <div className="flex items-center">
                                {/* Avatar: Used external placeholder service for quick replication */}
                                <img
                                    src={testimonial.avatarUrl}
                                    alt={`Avatar of ${testimonial.name}`}
                                    className="w-12 h-12 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <p className="text-md font-semibold text-gray-900">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {testimonial.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};