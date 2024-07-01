import React from 'react';
import bridal from '../../images/bridal.jpeg';
import arabic from '../../images/arabic.jpg';
import pakistani from '../../images/pakistani.jpg';

const Card = ({ image, title }) => {
    return (
        <div className="bg-[#f5f0eb] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img src={image} alt={title} className="w-full h-64 object-cover" />
            <div className="p-4">
                <h2 className="text-[#804f0e] text-xl font-bold">{title}</h2>
            </div>
        </div>
    );
};

const MyCollection = () => {
    const items = [
        {
            image: bridal,
            title: 'Bridal'
        },
        {
            image: arabic,
            title: 'Arabic'
        },
        {
            image: pakistani,
            title: 'Pakistani'
        }
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center text-[#804f0e] text-3xl font-bold mb-8">My Collection</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <Card key={index} image={item.image} title={item.title} />
                ))}
            </div>
        </div>
    );
};

export default MyCollection;
