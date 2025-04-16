import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedIndex: null,
      faqData: [
        {
          question: 'What is EcoConnect?',
          answer: 'EcoConnect is a platform designed to connect individuals with local sustainability efforts and allow them to support impactful environmental organizations worldwide. We aim to make it easy for anyone to take action for the planet.',
        },
        {
          question: 'How does EcoConnect work?',
          answer: 'You can use EcoConnect to find and join local events and community projects focused on sustainability. You can also browse and donate to verified environmental organizations working on various global initiatives.',
        },
        {
          question: 'Is EcoConnect a non-profit organization?',
          answer: 'We are a platform that facilitates connections and support for environmental causes. Our specific organizational structure will be detailed [link to your legal/organization page if applicable].',
        },
        {
          question: 'How do you ensure the organizations listed for donation are trustworthy?',
          answer: 'We carefully vet the organizations listed on our platform to ensure they are reputable and have a proven track record of impactful environmental work. [You might want to elaborate on your vetting process here].',
        },
        {
          question: 'Do I need to create an account to use EcoConnect?',
          answer: 'You can browse events and organizations without an account. However, creating an account allows you to track your contributions, save favorite projects, and register for events.',
        },
        {
          question: 'How do I find local sustainability events?',
          answer: 'Our "Find Events & Communities" section features an interactive map and directory where you can search for projects and events based on your location and interests.',
        },
        {
          question: 'Can I organize my own sustainability event through EcoConnect?',
          answer: 'Yes! Our platform will allow users to create and manage their own local sustainability events and invite others to join. [Note: This feature isn\'t explicitly shown as live yet, but it\'s in your description].',
        },
        {
          question: 'How do I join a local event I find on EcoConnect?',
          answer: 'Each event listing will have information on how to register or participate. This might involve RSVPing through the platform or contacting the event organizer directly.',
        },
        {
          question: 'What kind of events can I expect to find?',
          answer: 'You can expect to find a variety of events such as community cleanups, workshops on sustainable living, nature restoration projects, educational seminars, and more.',
        },
        {
          question: 'How can I donate to environmental organizations through EcoConnect?',
          answer: 'Our "Donate to Trusted Organizations" section provides profiles of various environmental nonprofits. You can select an organization and make a secure donation through our platform.',
        },
        {
          question: 'What percentage of my donation goes to the organization?',
          answer: '[Be transparent about any platform fees or if 100% of the donation goes directly to the organization].',
        },
        {
          question: 'Will there be a way to track my personal environmental impact on EcoConnect?',
          answer: 'Yes, we plan to introduce a user dashboard where you can track your contributions to events, donations, and potentially other sustainable actions you log.',
        },
        {
          question: 'Will there be personalized recommendations for local events or organizations I might be interested in?',
          answer: 'We are exploring ways to provide personalized recommendations based on your interests and location to help you find relevant opportunities.',
        },
      ],
    };
    this.toggleAccordion = this.toggleAccordion.bind(this);
  }

  toggleAccordion(index) {
    this.setState((prevState) => ({
      expandedIndex: prevState.expandedIndex === index ? null : index,
    }));
  }

  render() {
    return (
      <div className="bg-gray-100 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <ul className="space-y-4">
            {this.state.faqData.map((item, index) => (
              <li key={index} className="bg-white shadow rounded-lg overflow-hidden">
                <button
                  type="button"
                  className="w-full py-4 px-6 flex items-center justify-between text-left font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  onClick={() => this.toggleAccordion(index)}
                  aria-expanded={this.state.expandedIndex === index}
                >
                  <span>{item.question}</span>
                  <span className="ml-6 h-5 w-5 flex-shrink-0 transition-transform duration-200 ease-in-out">
                    {this.state.expandedIndex === index ? (
                      <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    this.state.expandedIndex === index ? 'py-4 px-6' : 'h-0 py-0'
                  }`}
                >
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default FAQ;