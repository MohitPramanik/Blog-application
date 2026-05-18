import { lazy, Suspense, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import SectionLoader from '../../components/SectionLoader';

const SecuritySection = lazy(() => import('./SecuritySection'));
const NotificationSection = lazy(() => import('./NotificationSection'));
const PrivacySection = lazy(() => import('./PrivacySection'));
const AppearanceSection = lazy(() => import('./AppearanceSection'));
const ConnectedAccountsSection = lazy(() => import('./ConnectedAccountsSection'));
const DangerZoneSection = lazy(() => import('./DangerZoneSection'));

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('security');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <Container fluid className="py-4 bg-white min-vh-100">
            <Row>
                <Col lg={3} md={4} className="mb-4">
                    <Card className="shadow-sm border-0 rounded-4">
                        <Card.Body>
                            <h4 className="fw-bold mb-4">Settings</h4>

                            <div className="d-md-none mb-3">
                                <div className="d-flex flex-wrap justify-content-center gap-2 pb-1">
                                    {[
                                        'security',
                                        'notifications',
                                        'privacy',
                                        'appearance',
                                        'accounts',
                                        'danger',
                                    ].map((section) => (
                                        <Button
                                            key={section}
                                            size="sm"
                                            variant={activeSection === section ? (section === 'danger' ? 'danger' : 'dark') : 'outline-secondary'}
                                            className="text-capitalize flex-shrink-0 rounded-pill"
                                            onClick={() => setActiveSection(section)}
                                        >
                                            {section === 'accounts'
                                                ? 'Accounts'
                                                : section === 'danger'
                                                    ? 'Danger Zone'
                                                    : section}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="d-none d-md-block">
                                <ListGroup variant="flush">
                                    <ListGroup.Item
                                        action
                                        active={activeSection === 'security'}
                                        onClick={() => setActiveSection('security')}
                                        className="border-0 rounded-3 mb-2"
                                    >
                                        Security
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                        action
                                        active={activeSection === 'notifications'}
                                        onClick={() => setActiveSection('notifications')}
                                        className="border-0 rounded-3 mb-2"
                                    >
                                        Notifications
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                        action
                                        active={activeSection === 'privacy'}
                                        onClick={() => setActiveSection('privacy')}
                                        className="border-0 rounded-3 mb-2"
                                    >
                                        Privacy
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                        action
                                        active={activeSection === 'appearance'}
                                        onClick={() => setActiveSection('appearance')}
                                        className="border-0 rounded-3 mb-2"
                                    >
                                        Appearance
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                        action
                                        active={activeSection === 'accounts'}
                                        onClick={() => setActiveSection('accounts')}
                                        className="border-0 rounded-3 mb-2"
                                    >
                                        Connected Accounts
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                        action
                                        active={activeSection === 'danger'}
                                        onClick={() => setActiveSection('danger')}
                                        className={`border-0 rounded-3 ${activeSection === 'danger'
                                            ? 'bg-danger text-white'
                                            : 'text-danger'
                                            }`}
                                    >
                                        Danger Zone
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={9} md={8}>
                    <Suspense fallback={<SectionLoader />}>
                        {activeSection === 'security' && <SecuritySection />}
                        {activeSection === 'notifications' && <NotificationSection />}
                        {activeSection === 'privacy' && <PrivacySection />}
                        {activeSection === 'appearance' && <AppearanceSection />}
                        {activeSection === 'accounts' && <ConnectedAccountsSection />}
                        {activeSection === 'danger' && (
                            <DangerZoneSection
                                showDeleteModal={showDeleteModal}
                                setShowDeleteModal={setShowDeleteModal}
                            />
                        )}
                    </Suspense>

                </Col>
            </Row>
        </Container>
    );
}