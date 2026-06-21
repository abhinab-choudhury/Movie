import type { ReactNode } from 'react';
import { Button, Card, CardBody } from '@material-tailwind/react';
import { ChevronRight } from 'lucide-react';

interface FeatureCardProps {
  category: string;
  title: string;
  description: string;
  icon?: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

const FeatureCard = ({
  category,
  title,
  description,
  icon,
  buttonText = 'Learn More',
  onButtonClick
}: FeatureCardProps) => {
  return (
    <Card
      className="p-6 rounded-xl border-2 border-gray-100 shadow-sm hover:shadow-lg 
                 transition-all duration-300 ease-in-out transform hover:-translate-y-2 
                 w-full group"
    >
      <CardBody className="flex flex-col items-center text-center">
        {icon && (
          <div className="mb-4 p-4 bg-gray-100 rounded-full group-hover:bg-blue-50 transition-colors">
            {icon}
          </div>
        )}
        <p className="text-xs uppercase font-bold tracking-wider text-gray-500 mb-2">{category}</p>
        <h3 className="text-2xl font-extrabold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
        <Button
          variant="outlined"
          color="blue"
          className="flex items-center gap-2 group-hover:bg-blue-50"
          onClick={onButtonClick}
        >
          {buttonText}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardBody>
    </Card>
  );
};

export default FeatureCard;
