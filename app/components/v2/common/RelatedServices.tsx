import React from 'react';
import type { AffiliateService } from '@/lib/comparisonData';
import ServiceCard from './ServiceCard';
import SectionTitle from './SectionTitle';

interface RelatedServicesProps {
  services: AffiliateService[];
  title?: string;
  variant?: 'simple' | 'comparison';
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

export default function RelatedServices({
  services,
  title = 'おすすめのサービス',
  variant = 'simple',
  layout = 'horizontal',
  className = '',
}: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <section className={`py-6 ${className}`}>
      <SectionTitle level="h2" className="mb-4">
        {title}
      </SectionTitle>

      <div className="space-y-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            variant={variant}
            layout={layout}
            showFeatures={true}
            showRecommendPoints={variant === 'comparison'}
          />
        ))}
      </div>
    </section>
  );
}
