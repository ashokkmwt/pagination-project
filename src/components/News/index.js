import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use';
import { API_ID } from '../../utils/helper'
import Pagination from '../Pagination';
import styles from './index.module.css'

export default function News() {

    const { width } = useWindowSize();

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [totalUsers, setTotalUsers] = useState("");

    const [userPerPage, setUserPerPage] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalUsers / userPerPage);

    useEffect(() => {
        setLoading(true);
        axios({
            method: 'get',
            url: `https://dummyapi.io/data/v1/user?page=${currentPage}&limit=10`,
            headers: {
                'app-id': API_ID
            }
        }).then(function (response) {
            setLoading(false);
            setUsers(response.data.data);
            setTotalUsers(response.data.total);
            setUserPerPage(response.data.limit);

        }).catch(err => {
            console.log(err);
        })
    }, [currentPage])

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const props = { currentPage, totalPages, prevPage, nextPage }

    return (
        <div className={styles.container}>
            <header>
                <h1>Dummy Data</h1>
            </header>

            <Pagination {...props} />

            {loading && <h1>Loading...</h1>}

            <main>
                {users.map((user, index) => {
                    return (
                        <div
                            style={width > 800 ?
                                index % 2 === 0 ? { paddingLeft: "10%" } : { paddingRight: "10%" } :
                                index % 2 === 0 ? { paddingLeft: "25%" } : { paddingRight: "25%" }
                            }
                            key={index}
                            className={styles.section} >
                            <div className={styles.newsBox}>
                                <div className={styles.image}>
                                    <img width="100%" height="100%" src={user.picture} alt={user.title} />
                                </div>
                                <h5>UserName: <span>{user.title}</span> {user.firstName} {user.lastName}</h5>
                            </div>
                        </div>
                    )
                })}

            </main >
        </div >
    )
}