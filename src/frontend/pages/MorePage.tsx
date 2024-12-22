import Button from '@mui/material/Button';

const MorePage = () => {
  async function resetPmset () {
    const result = await backend.sudoResetPmset();
    console.log("resetPmset",result);
  }
  return (
    <>
      {/* to be explore */}

      <Button
        variant="contained"
        onClick={resetPmset}
      >
        reset Pmset
      </Button>

    </>
  )
}

export default MorePage;