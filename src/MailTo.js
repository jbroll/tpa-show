import React from 'react';

export default function MailTo(props) {
    const subject = encodeURI(props.subject);
    const body = encodeURI(props.body);

    const mailTo = `mailto:${props.email}?subject=${subject}&body=${body}`;

    return (
          <a target="_top"
                rel="noopener noreferrer"
                href={mailTo} >
            {props.email}
          </a>
    );
}
