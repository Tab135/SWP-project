import './saltcal.scss';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
const Saltcal = () =>{
    const [pond_id, setPondId] = useState(null);
    const [ponds, setPonds] = useState([]);
    const PondDropdown = ({ setPondId }) => {
        const [ponds, setPonds] = useState([]);
        const [error, setError] = useState(null);
        const [selectedPond, setSelectedPond] = useState({ id: '', name: '' });
        const [isPondSelected, setIsPondSelected] = useState(false);
    
        useEffect(() => {
            const fetchPonds = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    const response = await axios.get('http://localhost:8080/user/pond', config);
                    setPonds(response.data.pondList);
    
                    // Lấy pond_id từ localStorage nếu đã có
                    const storedPondId = localStorage.getItem('selectedPondId');
                    if (storedPondId) {
                        const selectedPondName = response.data.pondList.find(pond => pond.id === parseInt(storedPondId))?.pondName || '';
                        setSelectedPond({ id: storedPondId, name: selectedPondName });
                        setIsPondSelected(true);
                        setPondId(storedPondId);
                    }
                } catch (error) {
                    console.error('Error fetching ponds', error);
                    setError('Could not fetch ponds.');
                }
            };
    
            fetchPonds();
        }, []);
    
        const handleChange = (e) => {
            const pond_id = e.target.value;
            const selectedPondName = ponds.find(pond => pond.id === parseInt(pond_id))?.pondName || '';
            setSelectedPond({ id: pond_id, name: selectedPondName });
            setIsPondSelected(true);
            setPondId(pond_id);
    
            // Lưu pond_id vào localStorage
            localStorage.setItem('selectedPondId', pond_id);
        };
        
        return (
            <div className='pond-name-dropdown'>
                {error && <p>{error}</p>}
                <select
                    id="pond-select"
                    onChange={handleChange}
                    value={selectedPond.id || ''}
                >
                    {!isPondSelected && <option value="">Select a pond</option>}
                    {Array.isArray(ponds) && ponds.length > 0 ? (
                        ponds.map((pond) => (
                            <option key={pond.id} value={pond.id}>
                                {pond.pondName}
                            </option>
                        ))
                    ) : (
                        <option value="">Loading ponds...</option>
                    )}
                </select>
            </div>
        );
    };
    return(
        <div className='salt-cal-page'>
            <h1>Salt calculator</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-6 col-lg-6 col-md-6 salt-cal'>
                            <div className='pond-name'><PondDropdown setPondId={setPondId}/></div>
                            <div>
                            {Array.isArray(ponds) && ponds.length > 0 ? (
                    ponds.map((pond) => (
                        <div key={pond.id} className="pond-card">
                            <img
                                src={`data:image/png;base64,${pond.picture}`}
                                alt={pond.pondName}
                                className="pond-image"
                            />
                            <div className="pond-details">
                                <p><strong>Pond Name:</strong> {pond.pondName}</p>
                                <p><strong>Depth:</strong> {pond.depth} m</p>
                                <p><strong>Volume:</strong> {pond.volume} L</p>
                                <p><strong>Drain:</strong> {pond.drain}</p>
                                <p><strong>Location:</strong> {pond.location}</p>
                                <p><strong>Number of Fish:</strong> {pond.numberOfFish}</p>
                                <p><strong>Skimmers:</strong> {pond.skimmers}</p>
                                <p><strong>Pumping Capacity:</strong> {pond.pumpingCapacity} W</p>
                                <p><strong>Water Source:</strong> {pond.waterSource}</p>
                                <div className="button-group">
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No ponds available.</p>
                )}
                            </div>
                          
                            <div>Curent concentration</div>
                            <div>Desired concentration</div>
                            <div>Water change</div>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-6'>
                            <div>
                                <p>info</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )

}
export default Saltcal;