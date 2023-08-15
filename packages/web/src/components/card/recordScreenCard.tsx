import React, { useState, useImperativeHandle, forwardRef } from "react";
import { CameraOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

const RecordScreenCard = forwardRef((props: any, ref: any) => {
	useImperativeHandle(ref, () => ({}));
	const [isRecordScreen, setIsRecordScreen] = useState(true);

	function handleRecordScreen() {
		window.electronAPI
			? window.electronAPI.sendCsOpenWin()
			: (location.href = "/recorderScreen.html");
	}

	return (
		<Card
			title="录屏"
			hoverable
			bordered={false}
			extra={<a href="#">更多</a>}
			style={{ maxWidth: 300 }}
			onClick={handleRecordScreen}
		>
			<div className="cardContent">
				<CameraOutlined rev={undefined} />
			</div>
		</Card>
	);
});

export default RecordScreenCard;
