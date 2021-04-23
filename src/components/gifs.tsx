import React from 'react';
import { connect } from 'react-redux';
import { loadTrendingGifs } from '../store/actions';
import { IGiphyAppState } from '../store/store';
import { GiphyClient } from '../api/apiClient';
import { gif } from '../api/model';

interface Props {
}

interface ReduxStateProps {
    trendingGifs: gif[];
}

interface DispatchProps {
    loadTrendingGifs: (data: gif[]) => void;
}

const GifAppDump: React.FunctionComponent<Props & ReduxStateProps & DispatchProps> = (props) => {
    const { trendingGifs, loadTrendingGifs } = props;
    const gifClient = new GiphyClient;

    React.useEffect(() => {
        gifClient.getTrendingGifs().then(res => res.data && loadTrendingGifs(res.data));
    }, []);

    return <div>
        {
            trendingGifs.map(tg => <div>
                <img src={`https://i.giphy.com/media/${tg.id}/giphy.webp`} />
                <div>{tg.title}</div>
            </div>
            )
        }
    </div>
}

export const GifApp = connect<{}, DispatchProps, {}, IGiphyAppState>((state) => ({
    trendingGifs: state.gifs.trendingGifs
}), dispatch => ({
    loadTrendingGifs: data => dispatch(loadTrendingGifs(data))
}))(GifAppDump);

// export default Layout;
