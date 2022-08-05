import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddTaskButton( { onClick }) {
    return (
    <Button variant='outlined' startIcon={<AddIcon />} onClick={onClick}>
        Adicionar Tarefa
    </Button>
)}

export default AddTaskButton;