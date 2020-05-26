import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Card, Typography, Row, Col, Carousel} from 'antd';
import axios from 'axios'
import styles from './Welcome.less';
import './Welcome.css';
import ErrorBoundary from "@/components/ErrorBoundary";
import BigTitle from "@/pages/BigTitle";

const { Paragraph } = Typography;
const CodePreview: React.FC<{}> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);


// eslint-disable-next-line no-undef
const serverAddress = process.env.NODE_ENV === 'production' ? `http://${window.location.host}:8002` : 'http://localhost:8002';

export default (): React.ReactNode => {
  const [data, setData] = React.useState<any>(null);
  React.useEffect(() => {
    axios.get(`${serverAddress}/tweets`).then( res => {
      if(res.status === 200 && typeof res?.data?.data === "object")
        setData(res.data.data)
    }).catch(console.log)
  },[])
  return (
    <ErrorBoundary>
      <PageHeaderWrapper>
        <BigTitle />
        <Carousel autoplay style={{marginBottom: 16}}>
          <div>
            <Card title={'Introduction'}>
              <h3>Huge amounts of data from social media, such as Twitter, provide enormous value for research. Even in Australia solely, there are approximately 5,300,000 monthly active Australian users on Twitter (Social Media Statistics Australia, 2020). Activities of this large population are valuable resources. For example, crawled tweets data contain text content, users’ coordinates or city name which support the analysis of users’ sentiment, preferences and daily life to some degree. Thus, architecture to support the analysis based on big data is essential.</h3>
            </Card>
          </div>
          <div><Card title={'Introduction'}>
            <h3>Our system utilizes the cloud service of National eResearch Collaboration Tools and Resources (NeCTAR) to functionalize harvesting, storing and analyzing Twitter data as a whole. Also, data from Australian Urban Intelligence Network (AURIN) inspired the topic analysis by comparing it with Twitter data. Containerization, automated deployment, and utilizing of NoSQL databases are also applied to make the whole system scalable.
            </h3> </Card>
          </div>
          <div><Card title={'Introduction'}>
            <h3>In this report, we focused on the sentiment analysis of people’s opinion towards newly-issued policies in Australia, and tried to find out whether economies have correlation to positive and negative attitudes rate. Additionally, influences of residents’ tweets in poor and rich regions and region-based language preferences of migrants are also what we are interested in. As a result, wealthier states tend to be more optimistic to policies and have more total tweets’ influences. And 85% tweets using English shows that migrants prefer to use English in Australia instead of their mother tongue.
            </h3> </Card>
          </div>
          <div><Card title={'Introduction'}>
            <h3>The functionalities and architecture of the system are illustrated in the next two sections. Along with the user guide and a discussion of NeCTAR research cloud in section 4 and 5. Analysis of scenarios are provided in section 6. We concluded the report and demonstrated the member’s role in the final two sections. The link of the source code is provided at the end.
            </h3> </Card>
          </div>
        </Carousel>

        <Row gutter={[16, 16]}>
          {[['DongNi Zhang', 955456],
            ['Handong Luo', 889534],
            ['Junyan Ye', 825839],
            ['Xin Wei Ding', 758966],
            ['Yefta Sutanto', 838383],
          ].map(person =>  <Col span={12} ><Card title={person[1]} >
            <h2>{person[0]}</h2>
          </Card></Col>)}
        </Row>



      </PageHeaderWrapper>
    </ErrorBoundary>
  );
}
