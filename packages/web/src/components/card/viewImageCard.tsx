import React, { useImperativeHandle, forwardRef } from "react";
import { PictureOutlined } from "@ant-design/icons";
import { Button, Card, Upload } from "antd";
import type { UploadProps } from "antd/es/upload/interface";

const ViewImageCard = forwardRef((props: any, ref: any) => {
	useImperativeHandle(ref, () => ({
		handleViewImage,
	}));

	const uploadProps: UploadProps = {
		accept: "image/png,image/jpeg,.webp",
		name: "file",
		multiple: false,
		showUploadList: false,
		customRequest: () => {},
		beforeUpload: (file) => {
			if (window.electronAPI) {
				window.electronAPI.sendViOpenWin({ imgUrl: file.path });
			} else {
				const imgUrl = window.URL.createObjectURL(file);
				window.open(`/viewImage.html?imgUrl=${encodeURIComponent(imgUrl)}`);
			}
			return false;
		},
	};

	function handleViewImage(e) {
		window.electronAPI
			? window.electronAPI.sendViOpenWin()
			: (location.href = "/viewImage.html");
		e.stopPropagation();
	}

	return (
		<Upload {...uploadProps}>
			<Card
				title="查看图片"
				hoverable
				bordered={false}
				extra={
					<Button type="link" onClick={handleViewImage}>
						打开
					</Button>
				}
				style={{ maxWidth: 300 }}
			>
				<div className="cardContent">
					<PictureOutlined rev={undefined} />
				</div>
			</Card>
		</Upload>
	);
});

export default ViewImageCard;
