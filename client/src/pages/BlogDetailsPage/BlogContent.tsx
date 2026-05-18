import { Card, Col, Row } from 'react-bootstrap'

export default function BlogContent({content}: {content: string}) {
  return (
     <Row className="justify-content-center">
        <Col lg={9}>
          <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5">
            <div className="blog-content">
              <p className="text-secondary lh-lg">
                {content}
              </p>
            </div>
          </Card>
        </Col>
      </Row>
  )
}
