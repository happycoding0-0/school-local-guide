import React from 'react';
import { Footprints, ShieldCheck } from 'lucide-react';

export const AreaContext: React.FC = () => {
  return (
    <div className="area-context">
      <span className="area-meta-tag">Historic North Valley · Seoul</span>
      <h1 className="area-title">Seongbuk-dong</h1>
      <p className="area-description">
        Tucked beneath the ancient ramparts of the Seoul City Wall and Mt. Bugak, Seongbuk-dong
        is an uncommercialized sanctuary of poet dwellings, secluded forest temples, and 50-year
        neighborhood kitchens.
      </p>
      <div className="area-metrics">
        <div className="area-metric-item">
          <Footprints size={14} aria-hidden="true" />
          <span>Walkable 1.8km Radius</span>
        </div>
        <div className="area-metric-item">
          <ShieldCheck size={14} aria-hidden="true" />
          <span>100% Verified Local Sites</span>
        </div>
      </div>
    </div>
  );
};
