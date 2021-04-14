import React from 'react';
import ContentLoader from 'react-content-loader';

export const ChatBarThread = props => {
    return (
        <ContentLoader
            speed={2}
            width={292}
            height={50}
            viewBox="0 0 292 50"
            backgroundColor="#151c29"
            foregroundColor="#954cf2"
            {...props}
        >
            <rect x="48" y="7" rx="3" ry="3" width="88" height="8" /> 
            <rect x="48" y="23" rx="3" ry="3" width="150" height="12" /> 
            <circle cx="20" cy="20" r="20" /> 
            <rect x="268" y="8" rx="3" ry="4" width="20" height="10" />
        </ContentLoader>
    )
}

ChatBarThread.metadata = {
    avatar: 'avatar',
    name: 'name',
    message: 'message',
    date: 'date',
    count: 'count'
}


export const ChatsUserThread = props => {
    return (
        <ContentLoader
            speed={2}
            width={716}
            height={44}
            viewBox="0 0 716 44"
            backgroundColor="#151c29"
            foregroundColor="#954cf2"
            {...props}
        >
            <rect x="54" y="8" rx="2" ry="2" width="164" height="11" /> 
            <rect x="54" y="28" rx="2" ry="2" width="52" height="6" /> 
            <circle cx="22" cy="22" r="22" />
        </ContentLoader>
    )
}

ChatsUserThread.metadata = {
    avatar: 'avatar',
    name: 'name',
    online: 'online'
}


export const ChatsUserMobileThread = props => {
    return (
        <ContentLoader
            speed={2}
            width={339}
            height={44}
            viewBox="0 0 339 44"
            backgroundColor="#151c29"
            foregroundColor="#954cf2"
            {...props}
        >
            <rect x="54" y="8" rx="2" ry="2" width="164" height="11" /> 
            <rect x="54" y="28" rx="2" ry="2" width="52" height="6" /> 
            <circle cx="22" cy="22" r="22" />
        </ContentLoader>
    )
}

ChatsUserMobileThread.metadata = {
    avatar: 'avatar',
    name: 'name',
    online: 'online'
}
