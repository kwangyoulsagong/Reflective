import React from 'react';
import Card from './Card';

export default {
  title: 'Components/Card',
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const PrimaryCard = Template.bind({});
PrimaryCard.args = {
  title: 'Card 1',
  description: 'This is the description for Card 1.',
  variant: 'primary',
};

export const SecondaryCard = Template.bind({});
SecondaryCard.args = {
  title: 'Card 2',
  description: 'This is the description for Card 2.',
  variant: 'secondary',
};

export const SuccessCard=Template.bind({})
SuccessCard.args={
    title:'Card 3',
    description:'This is the description for Card 3.',
    variant:'success'
}
