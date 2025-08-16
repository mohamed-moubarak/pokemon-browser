'use client';

import React from 'react';

const BriefCardSkeleton: React.FC = () => {
  return (
    <div className="border border-gray-50 rounded-lg p-4 bg-white min-h-full">
      <div className="block">
        <div className="min-w-full min-h-48 bg-gray-100 animate-pulse rounded-lg mb-2" />
        <div className="h-6 bg-gray-100 animate-pulse rounded mx-auto mb-2 w-3/4" />
        <div className="h-4 bg-gray-100 animate-pulse rounded mx-auto w-1/2" />
      </div>
    </div>
  );
};

export default BriefCardSkeleton;
