import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_ID } from '../../utils/helper'
import Pagination from '../Pagination';
import styles from './index.module.css'

export default function News() {

    const [users, setUsers] = useState([]);

    const [totalUsers, setTotalUsers] = useState("");

    const [userPerPage, setUserPerPage] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalUsers / userPerPage);

    useEffect(() => {
        axios({
            method: 'get',
            url: `https://dummyapi.io/data/v1/user?page=${currentPage}&limit=10`,
            headers: {
                'app-id': API_ID
            }
        }).then(function (response) {
            setUsers(response.data.data);
            setTotalUsers(response.data.total);
            setUserPerPage(response.data.limit);

        }).catch(err => {
            console.log(err);
        })
    }, [currentPage])

    const prevPage = () => {
        if (currentPage > 1) {
            setTimeout(function () {
                setCurrentPage(currentPage - 1)
            }, 1000)
        }
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setTimeout(function () {
                setCurrentPage(currentPage + 1)
            }, 1000)
        }
    }

    return (
        <div className={styles.container}>
            <header>
                <h1>Dummy Data</h1>
            </header>

            <Pagination currentPage={currentPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} />

            <main>
                {users.map((user, index) => {
                    return (
                        <div key={index} className={styles.section}>
                            <div className={styles.newsBox}>
                                <h4>{user.title}</h4>
                                <div className={styles.image}>
                                    <img width="100%" height="100%" src={user.picture} alt={user.title} />
                                </div>
                                <p>Description</p>
                                <h5>{user.firstName} {user.lastName}</h5>
                            </div>
                        </div>
                    )
                })}

            </main>
        </div>
    )
}