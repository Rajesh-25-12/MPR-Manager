// Mock data for the organization chart
export const mockJobs = [
  {
    id: 1,
    title: 'CEO',
    department: 'Executive',
    parentId: null,
    employee: {
      name: 'John Smith',
      code: 'EMP001',
      photo:
        'https://ui-avatars.com/api/?name=John+Smith&background=4f46e5&color=fff&size=128',
    },
  },
  {
    id: 2,
    title: 'CTO',
    department: 'Technology',
    parentId: 1,
    employee: {
      name: 'Sarah Johnson',
      code: 'EMP002',
      photo:
        'https://ui-avatars.com/api/?name=Sarah+Johnson&background=059669&color=fff&size=128',
    },
  },
  {
    id: 3,
    title: 'CFO',
    department: 'Finance',
    parentId: 1,
    employee: {
      name: 'Michael Brown',
      code: 'EMP003',
      photo:
        'https://ui-avatars.com/api/?name=Michael+Brown&background=dc2626&color=fff&size=128',
    },
  },
  {
    id: 4,
    title: 'VP Engineering',
    department: 'Technology',
    parentId: 2,
    employee: null,
  },
  {
    id: 5,
    title: 'VP Product',
    department: 'Product',
    parentId: 2,
    employee: {
      name: 'Emily Davis',
      code: 'EMP005',
      photo:
        'https://ui-avatars.com/api/?name=Emily+Davis&background=7c3aed&color=fff&size=128',
    },
  },
  {
    id: 6,
    title: 'Senior Software Engineer',
    department: 'Technology',
    parentId: 4,
    employee: null,
  },
  {
    id: 7,
    title: 'Software Engineer',
    department: 'Technology',
    parentId: 4,
    employee: {
      name: 'David Wilson',
      code: 'EMP007',
      photo:
        'https://ui-avatars.com/api/?name=David+Wilson&background=ea580c&color=fff&size=128',
    },
  },
  {
    id: 8,
    title: 'Product Manager',
    department: 'Product',
    parentId: 5,
    employee: null,
  },
  {
    id: 9,
    title: 'Finance Manager',
    department: 'Finance',
    parentId: 3,
    employee: {
      name: 'Lisa Anderson',
      code: 'EMP009',
      photo:
        'https://ui-avatars.com/api/?name=Lisa+Anderson&background=0891b2&color=fff&size=128',
    },
  },
  {
    id: 10,
    title: 'HR Manager',
    department: 'Human Resources',
    parentId: 1,
    employee: null,
  },
];

export const initialMPRs = [
  {
    id: 1,
    jobId: 4,
    jobTitle: 'VP Engineering',
    dateOfRequest: '2024-01-15',
    requestedBy: 'Sarah Johnson',
    candidates: [],
  },
  {
    id: 2,
    jobId: 6,
    jobTitle: 'Senior Software Engineer',
    dateOfRequest: '2024-01-20',
    requestedBy: 'Sarah Johnson',
    candidates: [
      {
        id: 1,
        name: 'Alex Thompson',
        email: 'alex.thompson@email.com',
        phone: '9875643210',
        description: 'Experienced full-stack developer',
        experience: 5,
        expectedSalary: 120000,
        resume: null,
      },
    ],
  },
];
