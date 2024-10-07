import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const Loading: React.FC = () => (
  <Flex>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </Flex>
);

export default Loading;
