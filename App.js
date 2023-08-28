import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Button,
  Grid,
  Typography,
  TextField
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { encodeSaveData } from './encoder';
import { parseSaveData } from './parser';
import FieldInput from './FieldInput';
const useStyles = makeStyles({
  container: {
    marginTop: '20px',
  },
  button: {
    margin: '10px',
  },
});

function App() {
  const classes = useStyles();
  const [parsedSaveData, setParsedSaveData] = useState({});
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem('hasSeenPrompt');
    if (hasSeenPrompt) {
      setShowPrompt(false);
    } else {
      localStorage.setItem('hasSeenPrompt', true);
    }
  }, []);
  // 从选择的文件中获取存档数据
  const handleSelectFile = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const fileContent = await readFileContent(file);
        const parsedData = parseSaveData(fileContent);
        setParsedSaveData(parsedData);
      } catch (error) {
        toast.error('无法读取存档文件:', error);
        setParsedSaveData({});
      }
    }
  };

  // 读取文件内容
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error('无法读取文件'));
      };

      reader.readAsText(file);
    });
  };

  // 更新存档数据字段
  const handleFieldChange = (event, field) => {
    setParsedSaveData(prevData => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  // 保存存档数据到本地文件
  const handleSave = () => {
    // 将保存数据转换为字符串
    const saveDataString = encodeSaveData(parsedSaveData);

    // 创建一个 Blob 对象
    const blob = new Blob([saveDataString], { type: 'application/json' });

    // 创建一个下载链接
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'Save_editor.lps';

    // 模拟点击下载链接
    downloadLink.click();
    toast.success("下载成功");
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <ToastContainer />
      {showPrompt && (
        toast.info("有些字段不建议修改\n关注嘉然谢谢喵")
      )}
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h4" component="h1" align="center">
            Vpet存档编辑器
          </Typography>
        </Grid>
        <Grid item>
          <input
            accept=".lps"
            type="file"
            style={{ display: 'none' }}
            id="select-file"
            onChange={handleSelectFile}
          />
        </Grid>
        <FieldInput
          label="名字"
          value={parsedSaveData.name}
          onChange={(event) => handleFieldChange(event, 'name')}
        />
        <FieldInput
          label="金币"
          value={parsedSaveData.money}
          onChange={(event) => handleFieldChange(event, 'money')}
        />
        <FieldInput
          label="经验"
          value={parsedSaveData.exp}
          onChange={(event) => handleFieldChange(event, 'exp')}
        />
        <FieldInput
          label="体力"
          value={parsedSaveData.strength}
          onChange={(event) => handleFieldChange(event, 'strength')}
        />
        <FieldInput
          label="商店体力"
          value={parsedSaveData.StoreStrength}
          onChange={(event) => handleFieldChange(event, 'StoreStrength')}
        />
        <FieldInput
          label="体力食物"
          value={parsedSaveData.strengthFood}
          onChange={(event) => handleFieldChange(event, 'strengthFood')}
        />
        <FieldInput
          label="商店体力食物"
          value={parsedSaveData.StoreStrengthFood}
          onChange={(event) => handleFieldChange(event, 'StoreStrengthFood')}
        />
        <FieldInput
          label="体力饮料"
          value={parsedSaveData.strengthDrink}
          onChange={(event) => handleFieldChange(event, 'strengthDrink')}
        />
        <FieldInput
          label="商店体力饮料"
          value={parsedSaveData.StoreStrengthDrink}
          onChange={(event) => handleFieldChange(event, 'StoreStrengthDrink')}
        />
        <FieldInput
          label="情绪值"
          value={parsedSaveData.feeling}
          onChange={(event) => handleFieldChange(event, 'feeling')}
        />
        <FieldInput
          label="商店情绪值"
          value={parsedSaveData.StoreFeeling}
          onChange={(event) => handleFieldChange(event, 'StoreFeeling')}
        />
        <FieldInput
          label="健康值"
          value={parsedSaveData.health}
          onChange={(event) => handleFieldChange(event, 'health')}
        />
        <FieldInput
          label="好感度"
          value={parsedSaveData.likability}
          onChange={(event) => handleFieldChange(event, 'likability')}
        />
        <FieldInput
          label="模式"
          value={parsedSaveData.mode}
          onChange={(event) => handleFieldChange(event, 'mode')}
        />
        <FieldInput
          label="哈希"
          value={parsedSaveData.hash}
          onChange={(event) => handleFieldChange(event, 'hash')}
        />
        <Grid item>
          <label htmlFor="select-file">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              component="span"
            >
              选择存档文件
            </Button>
          </label>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            保存存档
          </Button>
        </Grid>
      </Grid>
    </Container>

  );
}

export default App;
