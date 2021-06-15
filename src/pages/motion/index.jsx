import React, { useState, useEffect } from 'react';
import TweenOne from 'rc-tween-one';
import { Parallax, OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import Animate from 'rc-animate';
import Texty from 'rc-texty';
import style from './style.less';
import { Button } from 'antd';

export default function(props) {
    const [show, setShow] = useState(true);
    return (
        <div className={style.container}>
            <div style={{ height: 800 }}></div>
            <Button
                type="primary"
                onClick={() => {
                    setShow(!show);
                }}
            >
                Switch
            </Button>

            <div>文字动画</div>
            <Texty type="bounce" mode="random">
                {show && 'Ant Motion'}
            </Texty>

            <div>单个元素动画</div>
            <TweenOne
                animation={{
                    scale: 0.5,
                    rotate: 180,
                    yoyo: true, // demo 演示需要
                    repeat: -1, // demo 演示需要
                    duration: 1000,
                }}
                className="code-box-shape"
            />

            <div>显示/隐藏</div>
            <Animate transitionName="my-fade" transitionAppear>
                {show ? <div key="a" className="code-box-shape"></div> : null}
            </Animate>

            <div>跟随鼠标</div>
            <Parallax animation={{ rotate: 360 }} className="code-box-shape" />

            <div>屏幕下方30％出场</div>
            <OverPack playScale={0.3}>
                <div>动画队列</div>
                <QueueAnim
                    type={['right', 'left']}
                    ease={['easeOutQuart', 'easeInOutQuart']}
                >
                    {show
                        ? [
                              <div key="a" className="code-box-shape"></div>,
                              <div key="b" className="code-box-shape"></div>,
                              <div key="c" className="code-box-shape"></div>,
                              <div key="d" className="code-box-shape"></div>,
                          ]
                        : null}
                </QueueAnim>
            </OverPack>
        </div>
    );
}
