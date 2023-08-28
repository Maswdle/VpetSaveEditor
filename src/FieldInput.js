import { TextField, Grid } from '@material-ui/core';

const FieldInput = ({ label, value, onChange }) => {
    return (
        <Grid item>
            <TextField
                label={label}
                value={value || ''}
                onChange={onChange}
            />
        </Grid>
    );
};

export default FieldInput;
