import React,{useMemo} from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useStore } from '../store/useStore';
import JobNode from '../components/JobNode';

const OrganizationChart = () => {
  const jobs = useStore((state) => state.jobs);

  const buildTree = (jobs) => {
    const jobMap = new Map();
    const roots = [];

    jobs.forEach((job) => {
      jobMap.set(job.id, { ...job, children: [] });
    });

    jobs.forEach((job) => {
      const node = jobMap.get(job.id);
      if (job.parentId === null) {
        roots.push(node);
      } else {
        const parent = jobMap.get(job.parentId);
        if (parent) {
          parent.children.push(node);
        } else {
          roots.push(node);
        }
      }
    });

    return roots;
  };

const tree = useMemo(() => buildTree(jobs), [jobs]);
  const renderTree = (nodes, level = 0) => {
    if (nodes.length === 0) return null;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'relative',
          mt: level > 0 ? 4 : 0,
        }}
      >
        {level > 0 && nodes.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              top: -32,
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: '#9ca3af',
              zIndex: 0,
            }}
          />
        )}

        {nodes.map((node, index) => {
          const isFirst = index === 0;
          const isLast = index === nodes.length - 1;
          const hasChildren = node.children && node.children.length > 0;

          return (
            <Box
              key={node.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {level > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -32,
                    left: '50%',
                    width: '2px',
                    height: 32,
                    backgroundColor: '#9ca3af',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                  }}
                />
              )}

              {level > 0 && nodes.length > 1 && (
                <>
                  {!isFirst && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -32,
                        left: '50%',
                        width: '50%',
                        height: '2px',
                        backgroundColor: '#9ca3af',
                        zIndex: 1,
                      }}
                    />
                  )}
                  {!isLast && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -32,
                        right: '50%',
                        width: '50%',
                        height: '2px',
                        backgroundColor: '#9ca3af',
                        zIndex: 1,
                      }}
                    />
                  )}
                </>
              )}

              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <JobNode job={node} />
              </Box>

              {hasChildren && (
                <Box
                  sx={{
                    width: '2px',
                    height: 16,
                    backgroundColor: '#9ca3af',
                    mt: 1,
                    zIndex: 1,
                  }}
                />
              )}

              {hasChildren && (
                <Box sx={{ mt: 1 }}>{renderTree(node.children, level + 1)}</Box>
              )}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant='h4'
        component='h2'
        sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}
      >
        Organization Chart
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          overflowX: 'auto',
          py: 2,
        }}
      >
        {renderTree(tree)}
      </Box>
    </Paper>
  );
};

export default OrganizationChart;
