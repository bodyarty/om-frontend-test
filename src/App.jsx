import { useState } from 'react';
import InputLink from './components/InputLink';
import Player from './components/Player';

function App() {
    const [sourceLink, setSourceLink] = useState('');
    function uploadLink(link) {
        setSourceLink(link);
    }
    function goBack() {
        setSourceLink('');
    }

    return sourceLink !== '' ? (
        <Player goBack={goBack} sourceLink={sourceLink}/>
    ) : (
        <InputLink uploadLink={uploadLink} />
    );
}

export default App;
