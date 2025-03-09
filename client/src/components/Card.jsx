import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@material-tailwind/react';

const FeatureCard = ({ category, title, description }) => {
  return (
    <Card className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full">
      <CardBody className="flex flex-col items-center text-center">
        <p className="text-sm uppercase text-gray-400 font-semibold">{category}</p>
        <h3 className="text-2xl font-bold my-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
        <Button variant="outlined" color="white" className="mt-4">
          Button
        </Button>
      </CardBody>
    </Card>
  );
};

FeatureCard.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default FeatureCard;
