import ReactECharts from 'echarts-for-react';
import useLogData from '../../hooks/useLogData';
import useSelectTreeStore from '../../store/selectTreeStore';

const treeDataURI =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA2CAYAAADUOvnEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5tJREFUeNrcWE1oE0EUnp0kbWyUpCiNYEpCFSpIMdpLRTD15s2ePHixnj00N4/GoyfTg2fbiwdvvagHC1UQ66GQUIQKKgn1UAqSSFua38b3prPJZDs7s5ufKn0w7CaZ2W/fe9/73kyMRqNB3Nrj1zdn4RJ6du9T2u1a2iHYSxjP4d41oOHGQwAIwSUHIyh8/RA8XeiXh0kLGFoaXiTecw/hoTG4ZCSAaFkY0+BpsZceLtiAoV2FkepZSDk5EpppczBvpuuQCqx0YnkYcVVoqQYMyeCG+lFdaGkXeVOFNu4aEBalOBk6sbQrQF7gSdK5JXjuHXuYVIVyr0TZ0FjKDeCs6km7JYMUdrWAUVmZUBtmRnVPK+x6nIR2xomH06R35ggwJPeofWphr/W5UjPIxq8B2bKgE8C4HVHWvg+2gZjXj19PkdFztY7bk9TDCH/g6oafDPpaoMvZIRI5WyMB/0Hv++HkpTKE0kM+A+h20cPAfN4GuRyp9G+LMTW+z8rCLI8b46XO9zRcYZTde/j0AZm8WGb3Y2F9KLlE2nqYkjFLJAsDOl/lea0q55mqxXcL7YBc++bsCPMe8mUyU2ZIpnCoblca6TZA/ga2Co8PGg7UGUlEDd0ueptglbrRZLLE7poti6pCaWUo2pu1oaYI1CF9b9cCZPO3F8ikJQ/rPpQT5YETht26ss+uCIL2Y8vHwJGpA96GI5mjOlaKhowUy6BcNcgIhDviTGWCGFaqEuufWz4pgcbCh+w0gEOyOjTlTtYYlIWPYWKEsLDzOs+nhzaO1KEpd+MXpOoTUgKiNyhdy5aSMPNVqxtSsJFgza5EWA4zKtCJ2OGbLn0JSLu8+SL4G86p1Fpr7ABXdGFF/UTD4rfmFYFw4G9VAJ9SM3aF8l3yok4/J6IV9sDVb36ynmtJ2M5+CwxTYBdKNMBaocKGV2nYgkz6r+cHBP30MzAfi4Sy+BebSoPIOi8PW1PpCCvr/KOD4k9Zu0WSH0Y0+SxJ2awp/nlwKtcGyHOJ8vNHtRJzhPlsHr8MogtlVtwUU0tSM1x58upSKbfJnSKUR07GVMKkDNfXpzpv0RTHy3nZMVx5IOWdZIaPabGFvfpwpjnvfmJHXLaEvZUTseu/TeLc+xgAPhEAb/PbjO6PBaOTf6LQRh/dERde23zxLtOXbaKNhfq2L/1fAOPHDUhOpIf5485h7l+GNHHiSYPKE3Myz9sFxoJuAyazvwIMAItferha5LTqAAAAAElFTkSuQmCC';

const Forest = () => {
    const { data: forestData } = useLogData();

    const getOption = () => ({
        color: ['#e54035'],
        xAxis: {
            type: 'category',
            data: ['', '', '', '', '', '', '', '', '', ''], // X축 데이터를 빈 값으로 채움
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
        },
        yAxis: {
            type: 'category',
            data: ['1줄', '2줄', '3줄'], // Y축 데이터 추가
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
        },
        grid: {
            left: '10%',
            right: '30%',
            top: '50%',
            bottom: '10%',
            width: 1800 / 12,
        },
        series: [
            {
                name: 'forest',
                type: 'pictorialBar',
                symbol: 'image://' + treeDataURI,
                symbolSize: [30, 55],
                data: forestData.map((tree, index) => ({
                    value: Math.random() * 10, // 임의의 값 (나무의 크기)
                    dataInfo: tree,
                    itemStyle: {
                        opacity: 1,
                    },
                    // 나무 위치를 세 줄로 나누기
                    symbolPosition: [
                        (index % 4) * 20 + '%', // X축 좌표
                        Math.floor(index / 3) * 33 + '%', // Y축 좌표
                    ],
                })),
                animationEasing: 'elasticOut',
            },
        ],
    });

    // 나무 클릭 시 데이터를 표시하는 함수
    const onChartClick = (params: { data: { dataInfo: any } }) => {
        const { dataInfo } = params.data;
        if (dataInfo) {
            console.log(dataInfo);

            useSelectTreeStore.getState().select(dataInfo);
        }
    };

    return (
        <ReactECharts
            option={getOption()}
            onEvents={{
                click: onChartClick,
            }}
        />
    );
};

export default Forest;
