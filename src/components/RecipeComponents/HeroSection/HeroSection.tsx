import { TrendingUp, Users } from 'lucide-react';
import StatsCard from '../../StatusCard/StatusCard';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  highlightText: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  highlightText,
}) => {
  return (
    <section className="bg-linear-to-br from-primary/10 via-background to-secondary/5 border-b border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {title}
            <span className="block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              {highlightText}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
          <StatsCard
            icon={<Users className="w-5 h-5 text-card" />}
            label="Receitas"
            value="1.2K+"
          />
          <StatsCard
            icon={<TrendingUp className="w-5 h-5 text-card" />}
            label="Ativas Hoje"
            value="47"
          />
        </div>
      </div>
    </section>
  );
};
