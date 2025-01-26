'use client';
import React, { useState, useEffect } from "react";
import Grid from "@/components/ui/layout/Grid";

const ResponsiveGrid = ({ children, data, breakpoints }) => {
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      let count = 1;
      if (width >= 3072) count = breakpoints['5xl'] || 6;
      else if (width >= 2560) count = breakpoints['4xl'] || 6;
      else if (width >= 2048) count = breakpoints['3xl'] || 5;
      else if (width >= 1536) count = breakpoints['2xl'] || 4;
      else if (width >= 1280) count = breakpoints.xl || 3;
      else if (width >= 1180) count = breakpoints['ipad-landscape'] || 3;
      else if (width >= 768) count = breakpoints.ipad || 2;
      setVisibleItems(data.slice(0, count));
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, [data, breakpoints]);

  return <Grid className={'mx-5 mt-5'}>{visibleItems.map(children)}</Grid>;
};

export default ResponsiveGrid;
