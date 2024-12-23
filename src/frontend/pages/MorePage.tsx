import Button from '@mui/material/Button';
import pmsetImg from '../assets/pmset-img.png';

const MorePage = () => {
  async function resetPmset () {
    const result = await backend.sudoResetPmset();
    console.log("resetPmset",result);
  }
  return (
    <div>
      {/* to be explore */}
      <img
        width={"100%"}
        src={pmsetImg}
      />
      <Button
        style={{width:"100%"}}
        variant="contained"
        onClick={resetPmset}
      >
        reset Pmset
      </Button>

    </div>
  )
}

export default MorePage;