import React from 'react';


const Card = ({ title, value, icon: Icon, bgClass = 'bg-primary' }) => (
<div className={`card text-white ${bgClass} h-100`}>
<div className="card-body d-flex justify-content-between align-items-center">
<div>
<h6 className="card-subtitle mb-2">{title}</h6>
<h3 className="card-title">{value}</h3>
</div>
{Icon && <Icon size={36} className="opacity-75" />}
</div>
</div>
);


export default Card;