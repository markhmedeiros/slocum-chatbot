import React from 'react';
import type { Message } from '../types';
import SeoAuditForm from './SeoAuditForm';
import ScheduleCallButton from './ScheduleCallButton';
import LiveAgentButton from './LiveAgentButton';
import MarkdownRenderer from './MarkdownRenderer';

interface ChatMessageProps {
  message: Message;
  onSendMessage: (message: string) => void;
}

const UserIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
);

const ModelIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14.25 6.089C14.586 5.411 15.25 5 16 5h2a2 2 0 012 2v2c0 .75-.411 1.414-.089 1.75l-2.682 2.682a.75.75 0 000 1.061l2.682 2.682c.322.336.089 1-.089 1.75v2a2 2 0 01-2 2h-2c-.75 0-1.414-.411-1.75-.089l-2.682-2.682a.75.75 0 00-1.061 0l-2.682 2.682c-.336.322-1 .089-1.75-.089H4a2 2 0 01-2-2v-2c0-.75.411-1.414.089-1.75l2.682-2.682a.75.75 0 000-1.061L2.089 9.75C1.767 9.414 2 8.75 2 8V6a2 2 0 012-2h2c.75 0 1.414.411 1.75.089l2.682-2.682a.75.75 0 001.061 0l2.682-2.682zM12 15a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);


const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSendMessage }) => {
  const isUser = message.role === 'user';

  let displayContent = message.content;
  let actionComponent = null;

  if (message.role === 'model') {
    if (message.content.includes('[ACTION: SEO_AUDIT]')) {
      displayContent = message.content.replace('[ACTION: SEO_AUDIT]', '').trim();
      actionComponent = <SeoAuditForm onSendMessage={onSendMessage} />;
    } else if (message.content.includes('[ACTION: SCHEDULE_CALL]')) {
      displayContent = message.content.replace('[ACTION: SCHEDULE_CALL]', '').trim();
      actionComponent = <ScheduleCallButton />;
    } else if (message.content.includes('[ACTION: LIVE_AGENT]')) {
      displayContent = message.content.replace('[ACTION: LIVE_AGENT]', '').trim();
      actionComponent = <LiveAgentButton />;
    }
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in`}>
        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isUser ? 'bg-[#D13E2C] text-white' : 'bg-gray-700 text-white'}`}>
            {isUser ? <UserIcon className="w-5 h-5"/> : <ModelIcon className="w-5 h-5"/>}
        </div>
        <div className={`max-w-md lg:max-w-lg p-3 rounded-lg shadow ${isUser ? 'bg-[#D13E2C] text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800'}`}>
            <div className="prose prose-sm dark:prose-invert max-w-none break-words text-current">
              <MarkdownRenderer content={displayContent} />
            </div>
            {actionComponent}
            <p className={`text-xs mt-2 ${isUser ? 'text-red-200' : 'text-gray-400 dark:text-gray-500'}`}>
                {message.timestamp}
            </p>
        </div>
    </div>
  );
};
