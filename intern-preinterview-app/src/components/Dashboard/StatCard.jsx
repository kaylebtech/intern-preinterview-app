import React from 'react';
export default function StatCard({title,value,sub}){
  return (
    <div className="card" role="article" aria-label={title}>
      <div className="stat">{value}</div>
      <div style={{marginTop:8, fontWeight:700}}>{title}</div>
      <div className="card-sub">{sub}</div>
    </div>
  );
}