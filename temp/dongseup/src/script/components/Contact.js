import React from 'react';
import List from './List';

class Contact extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            selectedKey: -1,
            contactData: [ // 데이터가 없을경우 nodata
                {
                    name: '이승헌',
                    phone: '010-3484-2922',
                    accumulate: 2
                },
                {
                    name: '최훈철',
                    phone: '010-7878-2908',
                    accumulate: 1
                },
                {
                    name: '이인영',
                    phone: '010-2648-1909'
                },
                {
                    name: '이상훈',
                    phone: '010-9098-2958',
                    absence: 1,
                    accumulate: 3
                },
                {
                    name: '김율아',
                    phone: '010-2929-1100'
                },
                {
                    name: '유낙동',
                    phone: '010-2967-1123',
                    absence: 1
                },
                {
                    name: '이승헌',
                    phone: '010-3484-2922',
                    accumulate: 2
                },
                {
                    name: '최훈철',
                    phone: '010-7878-2908',
                    accumulate: 1
                },
                {
                    name: '이인영',
                    phone: '010-2648-1909'
                },
                {
                    name: '이상훈',
                    phone: '010-9098-2958',
                    absence: 1,
                    accumulate: 3
                },
                {
                    name: '김율아',
                    phone: '010-2929-1100'
                },
                {
                    name: '유낙동',
                    phone: '010-2967-1123',
                    absence: 1
                },
                {
                    name: '이승헌',
                    phone: '010-3484-2922',
                    accumulate: 2
                },
                {
                    name: '최훈철',
                    phone: '010-7878-2908',
                    accumulate: 1
                },
                {
                    name: '이인영',
                    phone: '010-2648-1909'
                },
                {
                    name: '이상훈',
                    phone: '010-9098-2958',
                    absence: 1,
                    accumulate: 3
                },
                {
                    name: '김율아',
                    phone: '010-2929-1100'
                },
                {
                    name: '유낙동',
                    phone: '010-2967-1123',
                    absence: 1
                }
            ]
        };
    }

    render() {
        const mapToComponents = (data) => {
            data.sort();

            return data.map((contact, i) => {
                return (
                    <List contact={contact} key={i} />
                );
            });
        };

        return (
            <div>                
                <div>{mapToComponents(this.state.contactData)}</div>
            </div>
        );
    }
}

export default Contact;