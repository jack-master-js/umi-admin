export const connectWS = () => {
    const ws = new WebSocket('ws://localhost:3000?token=test');

    ws.onopen = () => {
        console.log('onopen');

        ws.onmessage = async msg => {
            let arrBuf = await msg.data.arrayBuffer();
            let buf = new Uint8Array(arrBuf);
            let data = proto.decode(buf);
            console.log(data);
        };

        setInterval(() => {
            ws.send(proto.encode('ping', { clientTime: Date.now() }));
        }, 1000);
    };

    ws.onclose = () => {
        console.log('onclose');
    };

    ws.onerror = e => {
        console.log('onerror');
    };
};

export const connectSSE = () => {
    const es = new EventSource('http://localhost:3000/sse');
    es.onopen = () => {
        console.log('sse onopen');
    };
    es.onerror = e => {
        console.log('sse error ', e);
    };
    es.onmessage = e => {
        console.log('sse message ', e.data);
    };

    es.addEventListener('customEvent1', e => {
        console.log('sse customEvent1 ', e.data);
    });

    es.addEventListener('customEvent2', e => {
        console.log('sse customEvent2 data ', e.data);
        console.log('sse customEvent2 id ', e.lastEventId);
    });
};
