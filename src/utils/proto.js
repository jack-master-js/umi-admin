import protobuf from 'protobufjs';

class Proto {
    constructor() {
        this.msgType = null;
        this.load();
    }

    load() {
        protobuf.load('/ws.proto', (err, root) => {
            if (err) console.log(err);
            this.msgType = root.lookupType('stage.Body');
        });
    }

    encode(cmd, msg) {
        let data = { [cmd]: msg };
        return this.msgType.encode(data).finish();
    }

    decode(buff) {
        try {
            let data = this.msgType.decode(buff);
            return {
                cmd: data.cmd,
                msg: data[data.cmd],
            };
        } catch (e) {
            return null;
        }
    }
}

export default new Proto();
