import { Container, Card } from 'react-bootstrap';
import ResponsableGrid from '../../components/MaestroResponsable/ResponsableGrid';

function DashboardResponsable() {
    return (
        <Container className="mt-5">
            <Card className="p-4 shadow-sm ">
                <Card.Body>
                    <ResponsableGrid /> 
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DashboardResponsable;