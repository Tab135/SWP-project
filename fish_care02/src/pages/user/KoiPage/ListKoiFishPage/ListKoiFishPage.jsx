import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListKoiFishPage = () => {
    const [koiFishList, setKoiFishList] = useState([]);
    const [selectedPond, setSelectedPond] = useState('');
    const [ponds, setPonds] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPonds = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to view your fish.');
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://localhost:8080/user/pond', config);
                setPonds(response.data.pondList);
            } catch (error) {
                console.error('Error fetching ponds', error);
            }
        };

        fetchPonds();
    }, []);

    const fetchKoiFish = async (pondId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to view the fish.');
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(`http://localhost:8080/user/koi/${pondId}`, config);
            const koiList = response.data.koiList;
            console.log(koiList);
            if (koiList.length === 0) {
                setMessage('No koi fish found for this pond.');
            } else {
                setMessage('');
            }

            setKoiFishList(koiList);
        } catch (error) {
            console.error('Error fetching koi fish', error);
            setMessage('Error fetching koi fish.');
        }
    };

    const handlePondChange = (e) => {
        const pondId = e.target.value;
        setSelectedPond(pondId);
        if (pondId) {
            fetchKoiFish(pondId);
        } else {
            setKoiFishList([]);
            setMessage('');
        }
    };

    return (
        <div className="koi-fish-list-container">
            <h1>Koi Fish List</h1>
            <div className="pond-select">
                <label>Select Pond:</label>
                <select value={selectedPond} onChange={handlePondChange}>
                    <option value="">-- Select a Pond --</option>
                    {ponds.map((pond) => (
                        <option key={pond.id} value={pond.id}>
                            Pond {pond.pondName}
                        </option>
                    ))}
                </select>
            </div>

            {message && <p>{message}</p>}

            {koiFishList.length > 0 && !message ? (
                <div className="koi-fish-list">
                    {koiFishList.map((koi) => (
                        <div key={koi.id} className="koi-fish-card">
                            <img
                                src={`data:image/jpeg;base64,${koi.image}`}
                                alt={koi.koiName}
                                className="koi-fish-image"
                            />
                            <div className="koi-fish-info">
                                <h3>{koi.koiName}</h3>
                                <p>Variety: {koi.variety}</p>
                                <p>Length: {koi.length} cm</p>
                                <p>Age: {koi.age} years</p>

                                <div className="koi-actions">
                                    <Link to={`/list-koi/${koi.koiId}`}>
                                        <button>Detail</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default ListKoiFishPage;
